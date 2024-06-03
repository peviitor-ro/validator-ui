import broken_racket from '../../../assets/svgs/broken_racket.svg';

export function NoMoreResults({message}) {
    return (
        <div className="flex flex-col justify-center items-center">
            <img className='
                border-b-2 border-gray-500
            ' src={broken_racket} alt="broken_racket" width="100" height="100" />
            <span className="text-sm">{message}</span>
        </div>
    );
}