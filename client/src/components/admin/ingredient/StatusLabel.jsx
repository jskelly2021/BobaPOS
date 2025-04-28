
const StatusLabel = ({ ingredient }) => {
    return (
        <>
            {Number(ingredient.quantity) >= Number(ingredient.threshold) ? (
                <div className='StatusLabel GoodStatus'>
                    <p>Good</p>
                </div>
            ) : (
                <div className='StatusLabel LowStatus'>
                    <p>Low</p>
                </div>
            )}
        </>
    );
}

export default StatusLabel;