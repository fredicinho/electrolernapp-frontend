import React, {useCallback, useState} from 'react';
import { useDropzone } from 'react-dropzone'

const DragAndDropCsv = (props) => {

    const maxSize = 1048576;

    const onDrop = useCallback(acceptedFiles => {
        console.log(acceptedFiles);
        props.addedFile(acceptedFiles);
    }, []);

    const { isDragActive, getRootProps, getInputProps, isDragReject, acceptedFiles } = useDropzone({
        onDrop,
        accept: 'text/csv',
        minSize: 0,
        maxSize,
    });

    return (
        <div className="container text-center mt-5">
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                {!isDragActive && 'Drücke hier um eine CSV-Datei hochzuladen!'}
                {isDragActive && !isDragReject && "Drop it like it's hot!"}
                {isDragReject && "File type not accepted, sorry!"}
            </div>
        </div>
    );
};

export default DragAndDropCsv;