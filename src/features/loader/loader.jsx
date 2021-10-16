import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
export const LoaderComponent =()=>{
    return(
        <div className="flex justify-center flex-row items-center p-5">
            {/* <h1> loading </h1> */}
            <Loader
                type="Oval"
                color="#fc9e23"
                height={50}
                width={50}
                // timeout={3000} //3 secs
            />
        </div>
    )
}