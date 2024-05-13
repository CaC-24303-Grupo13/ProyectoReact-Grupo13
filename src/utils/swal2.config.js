/*MODIFICACIONES SWEET ALERT 2*/
import Swal from 'sweetalert2';
import "../../public/css/partials/alerts.css"

//Iconos utilizables: "info", "error"

class SweetAlertConfig {
    static alertaCheck(text1, text2){
        return Swal.fire({
           
            position: "center",                
            icon: "success",
            title: text1,
            text: text2,        
            showConfirmButton: false,
            timer: 4000,
            customClass :{                   
                popup: "alert__container",                   
            } ,   
          });
    }

    //Iconos utilizables: "info", "error"
    static alertaError(icon,text) {
        return Swal.fire({
            icon: icon,           
            text: text,
            showConfirmButton: true,    
            customClass: {                   
                popup: "alert__container",                   
            }
        });
    }
    
  }
  
  
  export default SweetAlertConfig;