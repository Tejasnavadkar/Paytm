

function Balance({balance}){
    return <>
      <div className="flex justify-start gap-2 font-bold my-4 mx-14">
        <div>Your Balance</div>
        <div>Rs {balance}</div>
        </div>
    </>
}

export default Balance