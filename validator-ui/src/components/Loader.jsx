import loader from '../assets/svgs/loader.svg';
import dots from '../assets/svgs/dots.svg';

export function Loader({ message = 'Se incarca', boxStyle, imgStyle }) {
    return (
        <div className={`flex flex-col items-center justify-center gap-1 ${boxStyle}`}>
            <img className={imgStyle} src={loader} alt="loader" />
            <div className="flex items-center gap-1 text-sm">
                <p>{message}</p>
                <img className="w-5 relative top-1" src={dots} alt="dots" />
            </div>
        </div>
    );
}
