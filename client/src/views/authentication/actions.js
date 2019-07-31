export const signUp = ({ email, password, firstName, lastName }) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    try {
      const firebase = getFirebase();
      const firestore = getFirestore();

      const response = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      firestore
        .collection("users")
        .doc(response.user.uid)
        .set({
          firstName,
          lastName
        });
      dispatch({ type: "SIGN_UP_SUCCESS" });
    } catch (error) {
      dispatch({ type: "SIGN_UP_ERROR", error });
    }
  };
};

export const signIn = ({ email, password }) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    try {
      const firebase = getFirebase();

      await firebase.auth().signInWithEmailAndPassword(email, password);
      dispatch({ type: "SIGN_IN_SUCCESS" });
    } catch (error) {
      dispatch({ type: "SIGN_IN_ERROR", error });
    }
  };
};

export const signOut = () => {
  return async (dispatch, getState, { getFirebase }) => {
    try {
      const firebase = getFirebase();
      await firebase.auth().signOut();

      dispatch({ type: "SIGN_OUT_SUCCESS" });
    } catch (error) {
      dispatch({ type: "SIGN_OUT_ERROR", error });
    }
  };
};
