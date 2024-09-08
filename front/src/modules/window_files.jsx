import { useRef, useEffect, useState } from 'react'
import './../css/WindowFiles.css'
import arrow from './../assets/right-arrow.png'
function WindwoFiles(){
    const ADD_BTN = useRef(null);
    const ADD_INP = useRef(null);
    const PUSH_FILE_CONTAINER = useRef(null);
    const [name_file, set_name_file] = useState('');
    const [size_file, set_size_file] = useState('');
    const [fileSelected, setFileSelected] = useState(false);

    useEffect(() => {
        if (PUSH_FILE_CONTAINER.current) {
            if (fileSelected) {
                PUSH_FILE_CONTAINER.current.classList.remove('none-display');
            } else {
                PUSH_FILE_CONTAINER.current.classList.add('none-display');
            }
        }
    }, [fileSelected]);

    function AddFile() {
        ADD_INP.current.click();
    }

    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    function truncateFileName(fileName) {
        const maxLength = 20;
        const extension = fileName.split('.').pop();
        const baseName = fileName.substring(0, fileName.lastIndexOf('.'));

        if (fileName.length <= maxLength) {
            return fileName;
        }

        const truncatedBaseName = baseName.substring(0, 17) + '... ';
        return `${truncatedBaseName}.${extension}`;
    }

    function ChangeFile(event) {
        ADD_BTN.current.classList.add('none-display')
        const file = event.target.files[0];
        console.log(file);
        set_name_file(truncateFileName(file.name));
        set_size_file(formatFileSize(file.size));
        setFileSelected(true);
    }

    return(
        <div className="main-window-files-container">
            <div className="header-window-files">
                <div className="format">
                    <p className='format-type'>MP4</p>
                    <img className='btn-arrow-img' src={arrow} />
                    <p className='format-type'>GIF</p>
                </div>
            </div>
            <div className='unload-container'>
                <button onClick={AddFile} ref={ADD_BTN} className='add-file'>add File <strong className='add-file-strong'>+</strong></button>
                <input onChange={ChangeFile} ref={ADD_INP} className='file-imp' type="file" id="fileInput" accept="video/mp4" />
                
                <div ref={PUSH_FILE_CONTAINER} className="push-file-container">
                    <div className="push-file">
                        <p className='conver-btn-text'>Convert to gif</p>
                    </div>
                    <div className="data-file">
                        <div className='file-info'>name: {name_file}</div>
                        <div className='file-info'>size: {size_file}</div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default WindwoFiles