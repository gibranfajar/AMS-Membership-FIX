import axios from "axios";

export const fetchUser = async (dispatch : any) => {
    const member = localStorage.getItem("member");

    const response = await axios.get(
        `https://golangapi-j5iu.onrender.com/api/member/mobile/dashboard/info?memberID=${member}`
    );

    const data = response.data.memberInfoData;

    dispatch({
        type: "FETCH_USER_REQUEST",
    });

    if (response.status === 200) {
        dispatch({
            type: "FETCH_USER_SUCCESS",
            payload: data,
        });
    }
};