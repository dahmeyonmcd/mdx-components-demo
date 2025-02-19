export default function DemoLayout({ children }: any) {

    return(
        <>
            <div className={"flex flex-grow w-full h-screen bg-red-200 flex-col items-center justify-center"}>
                <div className={"flex-grow flex bg-[#444444] min-w-[500px] w-[800px] min-h-[800px] h-[800px] items-center justify-center"}>
                    <main className={"flex flex-grow bg-green-300 h-full w-[100%]"}>
                        {children}
                    </main>
                </div>
            </div>
        </>
    )

}