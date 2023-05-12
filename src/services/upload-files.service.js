import axios from "axios";
const loc = window.location

class UploadFilesService {
  upload = async (images) => {
    // let formData = new FormData();
    // console.log(images)
    // // formData.append("images", images);
    // for (let i = 0; i < images.length; i++) {
    //     formData.append('images', images[i].data);
    //   }
    let output = []
    for (let image of images) {
      console.log(image)
      if (image.data) {
        let formData = new FormData();
        formData.append('images', image.data)
        await axios.post(`${loc.protocol}//${loc.hostname}${loc.hostname === 'localhost' ? ':7070/data/users/upload' : '/data/users/upload'}`, formData, {
          headers: {
            "Access-Control-Allow-Origin": ["http://localhost:7071", "https://www.careerpivot.io"],
            'Content-Type': 'multipart/form-data'
          }
        }).then(({data}) => {
          output.push({...data[0]})
        })
      } else {
        output.push(image)
      }
    }
  return output
  }
}

export default new UploadFilesService();