import React from 'react';

function AddBatchScholar() {
    const readGoogleSheet = () => {
        fetch('https://sheetdb.io/api/v1/vfs4ivb1107z6')
            .then((response) => response.json())
            .then((data) => console.log(data));

    }
    return (
        <div className="flex justify-center items-center h-screen bg-blue-900">
            <div className="bg-white rounded-lg shadow-lg p-12 w-full max-w-4xl">

                <div className="flex flex-col items-start mb-8">
                    <h2 className="text-3xl font-normal text-blue-900 mb-4">Batch Uploads</h2>
                    <button className="bg-green-700 hover:bg-green-700 text-white font-bold py-2 px-12 rounded
                    " onClick={() => readGoogleSheet()}>
                        Extract
                    </button>

                </div>
                <div className="bg-blue-700 h-[450px] mb-10 rounded-md"></div>
                <div className="flex justify-end space-x-4">
                    <button className="bg-green-700 hover:bg-green-600 text-white font-bold py-2 px-12 rounded">
                        Previous
                    </button>
                    <button className="bg-green-700 hover:bg-green-600 text-white font-bold py-2 px-12 rounded">
                        Submit
                    </button>
                </div>



            </div>
        </div>
    );
}

export default AddBatchScholar;
