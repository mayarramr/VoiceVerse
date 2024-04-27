import React , {useState} from 'react'
import Style from './CreateUrSong.module.css'
import { MdOutlineUpload } from "react-icons/md";
import { IoMaleSharp, IoFemale } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";

export default function CreateUrSong() {
  const [isOpen, setIsOpen] = useState(false)


    const icons = [
        { icon: <IoMaleSharp className="display-1 mb-3" />, title: 'Male' },
        { icon: <IoFemale className="display-1 mb-3" />, title: 'Female' },
        { icon: <FaPlus className="display-1 mb-3" />, title: 'Add Yours', className: 'fs-2' }, // Add fs-1 class for potentially smaller font size
      ];
      


    return <>
      <div className={`${!isOpen ? "col-md-11" : "col-md-10" }`}>
      <div className="bgDark vh-100">
       <div className="container pt-5">
            <div className="row justify-content-center ">
                <div className="col-md-7 text-center">
                    <h1 className={`${Style.textBg} display-2 fw-bold mt-5`}>Voice Verse</h1>
                    <div className={`${Style.InputContainer} w-100 position-relative`}>
                        <input placeholder="Upload song's link to change voice" id="input" className={`${Style.input}`} name="text" type="text" />
                        <MdOutlineUpload className="position-absolute text-white end-0 me-4 fs-5" />

                    </div>
                </div>
            </div>

            <div className="mt-5">
                <h2 className="text-white">Choose Voice</h2>
            </div>
            <div className="row my-4">
      {icons.map((item) => (
        <div key={item.title} className="col-md-2 text-center text-white d-flex flex-column align-items-center">
          <div className={`${Style.customBorder} w-100`}>
            <div className={`${Style.borderModule}`}>
              {item.icon}
              <h2 className={`fw-light ${item.className || ''}`}>{item.title}</h2>
            </div>
          </div>
        </div>
      ))}
    </div>
        </div>
       </div>
      </div>

    </>
}
