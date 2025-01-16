// -----preview image---------
const uploadImage = document.querySelector("[upload-image]");
if(uploadImage)
{
    const uploadImageFile = uploadImage.querySelector("[upload-image-file]");
    const uploadImagePreview = uploadImage.querySelector("[upload-image-preview]");
    
    uploadImageFile.addEventListener("change", (e) => {
        // console.log(e.target.files);
        const [file] = e.target.files;
        if(file)
        {
            uploadImagePreview.src = URL.createObjectURL(file);
        }
    })
}
// -----end preview image-----