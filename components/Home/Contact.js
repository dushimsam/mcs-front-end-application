import Image from "next/image";
import emailjs from "emailjs-com";
import {notifySuccess} from "../../utils/alerts";
import {useState} from "react";


export default function Contact() {
  const [values, setValues] = useState({
    names: "",
    email: "",
    message: "",
  });



  const handleSendContact=()=>{
    var template_params = {
      "from_name":values.names+" on Contact Us",
      "to_name":"MountCarmelSchool",
      "reply_to":values.email,
      "message":values.message
    }

    emailjs.send('mount_carmel_school', 'template_dm9c1yo', template_params, 'user_edVqhyNkFZWLhEkrWnEi4')
        .then((result) => {
          notifySuccess("Thanks for reaching us.", "TOP_RIGHT");
        }, (error) => {
          console.log(error.text);
        });
  }


  return (
    <div className="mt-5 container-fluid bg-gray pt-5 pb-5">
      <div className="d-flex flex-wrap pb-5">
        <div className="contact-part px-md-5 px-2 w-100 pt-md-5">
          <h4>Get in Touch</h4>
          <form className="mt-4 pb-5">
            <div className="form-group">
              <input
                  onChange={(e)=>setValues({...values,name:e.target.value})}
                type="text"
                className="form-control border-0"
                id="name"
                placeholder="Name"
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                onChange={(e)=>setValues({...values,email:e.target.value})}
                className="form-control border-0"
                id="email"
                aria-describedby="emailHelp"
                placeholder="Enter email"
              />
            </div>
            <div className="form-group">
              <textarea
                type="text"
                onChange={(e)=>setValues({...values,message:e.target.value})}
                className="form-control border-0"
                id="message"
                placeholder="Message"
              />
            </div>

            <button type="submit" className="btn green-btn rounded-pill px-3" onClick={()=>handleSendContact()}>
              Send
            </button>
          </form>
        </div>
        <div className="pl-md-4">
          <Image
            src="/images/map.PNG"
            alt="Welcome picture"
            width={600}
            height={400}
          />
        </div>
      </div>
    </div>
  );
}
