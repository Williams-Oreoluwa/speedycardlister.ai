const Confirmation = () => {
    return (
        <main>
            <div className="flex flex-col gap-2 items-center  justify-center ">
                <h2 className="capitalize text-xl md:text-[1.5rem] font-bold text-center">
                    Profile update completed
                </h2>

                <div className="flex rounded-full items-center justify-center ">
                    <img
                        src="/successGif.gif"
                        alt=""
                        className="h-[200px] md:h-[290px]"
                    />
                </div>
                <p className="text-center text-[1.2rem]">
                    Link your eBay account to start moving cards.
                </p>
            </div>
        </main>
    );
};

export default Confirmation;
