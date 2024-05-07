import React, { useEffect, useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const Profile = () => {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0); // Track upload progress
  const [imageURL, setImageURL] = useState(""); // Store the download URL
  const [error, setError] = useState(""); // Handle potential errors
  const [isLoading, setIsLoading] = useState(false);
  const storage = getStorage();

  useEffect(() => {
    const fetchImage = async () => {
      setIsLoading(true);
      try {
        const imageRef = ref(storage, "ProfilePictures/lebron.jpg");
        const url = await getDownloadURL(imageRef);
        setImageURL(url);
      } catch (error) {
        console.error("Error fetching image:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImage();
  }, []); // Empty dependency array: runs only on mount

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      setError("Please select a file");
      return;
    }

    const metadata = {
      contentType: file.type, // Use the actual file type
    };

    const storageRef = ref(storage, "ProfilePictures/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        setError(error.message); // Set the error message
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageURL(downloadURL);
          setProgress(0); // Reset progress
          setError(""); // Clear error
          console.log("Image uploaded!", downloadURL);
        });
      }
    );
  };

  return (
    <div>
      <div className="bg-white-950 w-full mb-6 shadow-lg rounded-xl mt-4">
        <div className="p-6">
          <div className="flex flex-wrap justify-end">
            <span className="inline-flex overflow-hidden rounded-md bg-red-950 shadow-sm">
              <a
                className="inline-block p-3 text-white hover:bg-red-800 focus:relative"
                title="Edit Quiz"
              >
                <div>Edit Profile</div>
              </a>
            </span>
            <div className="w-full flex justify-center">
              <div className="relative">
                {imageURL && <img src={imageURL} alt="From Storage" className="rounded-full w-32 h-32"/>}
              </div>
            </div>
            <div className="w-full text-center mt-20">
              <div className="flex justify-center lg:pt-4 pt-8 pb-0">
                <div className="p-3 text-center">
                  <span className="text-xl font-bold block uppercase tracking-wide text-slate-700">
                    3,360
                  </span>
                  <span className="text-sm text-slate-400">Photos</span>
                </div>
                <div className="p-3 text-center">
                  <span className="text-xl font-bold block uppercase tracking-wide text-slate-700">
                    2,454
                  </span>
                  <span className="text-sm text-slate-400">Followers</span>
                </div>

                <div className="p-3 text-center">
                  <span className="text-xl font-bold block uppercase tracking-wide text-slate-700">
                    564
                  </span>
                  <span className="text-sm text-slate-400">Following</span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-2">
            <h3 className="text-2xl text-slate-700 font-bold leading-normal mb-1">
              Lebron James 
            </h3>
            <div className="text-xs mt-0 mb-2 text-slate-400 font-bold uppercase">
              <i className="fas fa-map-marker-alt mr-2 text-slate-400 opacity-75"></i>
              IDK
            </div>
          </div>
          <div className="mt-6 py-6 border-t border-slate-200 text-center">
            <div className="flex flex-wrap justify-center">
              <div className="w-full px-4">
                <p className="font-light leading-relaxed text-slate-600 mb-4">
                  An artist of considerable range, Mike is the name taken by
                  Melbourne-raised, Brooklyn-based Nick Murphy writes, performs
                  and records all of his own music, giving it a warm.
                </p>
                <a
                  href="javascript:;"
                  className="font-normal text-slate-700 hover:text-slate-400"
                >
                  Follow Account
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="relative pt-6 pb-2 mt-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-6/12 px-4 mx-auto text-center"></div>
          </div>
        </div>
      </footer>

      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileUpload} />
        <button type="submit">Upload</button>
      </form>

    </div>
  );
};

export default Profile;
