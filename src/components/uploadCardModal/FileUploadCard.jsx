const FileUploadCard = ({ file }) => {
    return (
        <div>
            <div key={file?.name}>
                <div className=" flex items-center justify-between gap-3 p-[6px] rounded mt-[7px] border-[0.5px]  border-[#7F56D9]">
                    <img
                        src="/cloud_icon.png"
                        alt="icon"
                        className="w-8 h-8 mr-[6px]"
                    />
                    <div className="h-[8px] w-full bg-[#F1F5F9] rounded">
                        <p
                            className={`max-w-[${50}%] w-full h-full bg-[#7F56D9] rounded`}
                        ></p>
                    </div>
                    <p className="text-sm font-semibold">30%</p>
                </div>
            </div>
        </div>
    );
};

export default FileUploadCard;

//  <div>
//                 {files?.lenght >= 0 && (
//                     <p className="mt-6 mb-4 text-sm">
//                         Cards remaining:{" "}
//                         <span className="font-semibold">{files?.length}</span>
//                     </p>
//                 )}
//             </div>
//             <div className="flex flex-col gap-4 max-h-[392px] pr-1 overflow-auto">
//                 {fileContent?.map((item, i) => {
//                     return (
//                         <div key={i}>
//                             {/* {files?.lenght >= 0 && ( */}
//                             <div className="flex justify-between items-center">
//                                 <p className="text-sm">Card 1</p>
//                                 <p>
//                                     <CloseCircle size="18" color="#94A3B8" />
//                                 </p>
//                             </div>
