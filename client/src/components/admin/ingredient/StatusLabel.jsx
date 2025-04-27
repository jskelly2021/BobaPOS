
const StatusLabel = ({ ingredient }) => {
    return (
        <>
            {Number(ingredient.quantity) >= Number(ingredient.threshold) ? (
                <div className='StatusLabel GoodStatus'>
                    <p>Good</p>
                </div>
            ) : (
                <div className='StatusLabel BadStatus'>
                    <p>Insufficient</p>
                </div>
            )}
        </>
    );
}

export default StatusLabel;