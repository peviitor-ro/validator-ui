import React from "react";

import { useSelector } from "react-redux";


export default function Test() {
    const auth = useSelector((state) => state.auth);

    console.log(auth);

    return (
        <div>
            <h1>Test</h1>
        </div>
    );
}


// const mapStateToProps = state => ({
//     oauth: state.oauth
//   });
  
//   const mapDispatchToProps = dispatch => ({
//     loginSuccess: (data) => {dispatch(loginSuccess(data))},
//     logout: () => dispatch(logout())
//   });
  

  
//   export default connect(mapStateToProps, mapDispatchToProps)(Test);
  