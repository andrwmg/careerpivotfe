import axios from "axios";
const loc = window.location

class UploadEditFilesService {
  uploadEdit(images) {
          const createFormData = async (image) => {
            if (image.data) {
              let formData = new FormData();
              formData.append('images', image.data)
              return await axios.post(`${loc.protocol}//${loc.hostname}${loc.hostname === 'localhost' ? ':7070/data/listings/upload' : '/data/listings/upload'}`, formData, {
                headers: {
                  "Access-Control-Allow-Origin": "http://localhost:7071",
                  'Content-Type': 'multipart/form-data'
                }
              })
            } else {
              return image
            }
          }
      
          let output = []
      
          images.map(async (image) => {
            let finalImage = await createFormData(image)
            output.push(finalImage)
          })
      
          return output
      }
    }
    
export default new UploadEditFilesService();