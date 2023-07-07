const currentPage = location.pathname
const menuItems = document.querySelectorAll('.container-admin .menu a')
const menuItems2 = document.querySelectorAll('.container .menu a')

for (item of menuItems) {
    if (currentPage.includes(item.getAttribute("href"))) {
        item.classList.add('active')
    }
}

for (item of menuItems2) {
    if (currentPage.includes(item.getAttribute("href"))) {
        item.classList.add('active')
    }
}

const cards = document.querySelectorAll('.card');

for (let card of cards) {
    card.addEventListener("click", function(){
        const recipeId = card.getAttribute('id');

        window.location.href = "recipes/" + recipeId.toString()
    })
}

const PhotosUpload = {
    input: "",
    preview: document.querySelector('#photo-preview'),
    uploadLimit: 5,
    files: [],
    handleFileInput(event) {
        const { files:fileList } = event.target
        PhotosUpload.input = event.target
        
        if (!PhotosUpload.hasLimit(event)) return

        Array.from(fileList).forEach(file => {
            const reader = new FileReader()

            PhotosUpload.files.push(file)

            reader.onload = () => {
                const image = new Image()
                image.src = String(reader.result)

                const div = PhotosUpload.getContainer(image)
                PhotosUpload.preview.appendChild(div)
            }

            reader.readAsDataURL(file)
        })

        PhotosUpload.input.files = PhotosUpload.getAllFiles()
    },
    hasLimit(event) {
        const { uploadLimit, input, preview } = PhotosUpload
        const { files:fileList } = input


        if (fileList.length > uploadLimit) {
            alert(`Envie no máximo ${uploadLimit} fotos`)
            event.preventDefault()
            return false
        }

        const photosDiv = []
        preview.childNodes.forEach(item => {
            if (item.classList && item.classList.value == "photo")
                photosDiv.push(item)
        })

        const totalPhotos = fileList.length + photosDiv.length
        if (totalPhotos > uploadLimit){
            alert('Você atingiu o limite máximo de fotos.')
            event.preventDefault()

            return false
            
        }    
        return true
    },
    getAllFiles() {
        const dataTransfer = new ClipboardEvent("").clipboardData || new DataTransfer()

        PhotosUpload.files.forEach(file => dataTransfer.items.add(file))

        return dataTransfer.files
    }, 
    getContainer (image) {
        const div = document.createElement('div')
        div.classList.add('photo')

        div.onclick = PhotosUpload.removePhoto

        div.appendChild(image)

        div.appendChild(PhotosUpload.getRemoveButton())

        return div
    },
    getRemoveButton() {
        const button = document.createElement('i')
        button.classList.add('material-icons')
        button.innerHTML = "close"
        return button
    },
    removePhoto(event) {
        const photoDiv = event.target.parentNode // <div class="photo">
        const photosArray = Array.from(PhotosUpload.preview.children)
        const index = photosArray.indexOf(photoDiv)

        PhotosUpload.files.splice(index, 1)

        PhotosUpload.input.files = PhotosUpload.getAllFiles()

        photoDiv.remove()
    },
    removeOldPhoto(event) {
        const photoDiv = event.target.parentNode

        if (photoDiv.id) {
            const removedFiles = document.querySelector('input[name="removed_files"]')
            if (removedFiles) {
                removedFiles.value += `${photoDiv.id},`
            }
        }


        photoDiv.remove()
    }

}

const ImageGallery = {
    highlight: document.querySelector('.highlight > img'),
    previews: document.querySelectorAll('.photos-preview img'),
    setImage(e) {
        const { target } = e

        // ImageGallery.previews.forEach(preview => preview.classlist.remove('active')) - NÃO FUNCIONA
        ImageGallery.previews.forEach(function(preview) {
            preview.classList.remove('active')
        })
        ImageGallery.highlight.src = target.src

        target.classList.add('active')
    }
}

const ChefImageUpload = {
    previewChefImage() {
        const preview = document.querySelector('#avatar')
        const file = document.querySelector('input[type=file]').files[0]
        const reader = new FileReader()

        reader.addEventListener("load", function(){
            preview.src = reader.result
            preview.classList.add('active')
        }, false)

        if (file) {
            reader.readAsDataURL(file)
        }
    }
}

const Validate = {
    apply(input, func) {
        Validate.clearErrors(input)

        let results = Validate[func] (input.value)
        input.value = results.value

        if (results.error)
            Validate.displayError(input, results.error)

    },
    displayError(input, error) {
        input.setAttribute("id", "form-error")
        const div = document.createElement('div')
        div.classList.add('error-div')
        div.innerHTML = error
        input.parentNode.appendChild(div)
        input.focus()
    },
    clearErrors(input) {
        const errorDiv = input.parentNode.querySelector('.error-div')
        if (errorDiv)
        errorDiv.remove()
        input.removeAttribute("id")
    },
    isEmail(value) {
        let error = null

        const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

        if(!value.match(mailFormat))
            error = "E-mail inválido"
        return {
            error,
            value
        }
    },
    isEmpty(value) {
        let error = null

        if(!value)
            error = "Campo obrigatório"
        return {
            error,
            value
        }
    }

}

const addRemoveFields = {
    input: "",
    parent: "",
    container: "",

    add(event) {
        this.input = event.target
        this.parent = this.input.parentElement
        this.container = this.parent.querySelector('.input-field').lastElementChild
        
        const newField = this.container.cloneNode(true);
        
        if (newField.children[0].value == "") return false;
        
        newField.children[0].value = "";

        this.parent.querySelector('.input-field').appendChild(newField);
    },
    remove(event) {
        this.input = event.target
        this.parent = this.input.parentElement.parentElement

        if (this.parent.parentElement.children.length == 1) {
            return false
        } else {
            this.parent.parentElement.removeChild(this.parent)
        }
    }
}

const hideAndShow = {
    input: "",
    toggleButton(event) {
        this.input = event.target

        if (this.input.innerHTML == 'ESCONDER') {
            const parent = this.input.parentElement.parentElement.querySelector('.toggle-list')
            parent.classList.add('hide')
            this.input.innerHTML = 'MOSTRAR'
        } else {
            const parent = this.input.parentElement.parentElement.querySelector('.toggle-list')
            parent.classList.remove('hide')
            this.input.innerHTML = 'ESCONDER'
        }
    }
}

