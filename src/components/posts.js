import useInput from "../hooks/use-input";
import { useHistory } from "react-router";

const Posts = () => {
    const history = useHistory();

  const {
    value: title,
    isValid: enteredTitleIsValid,
    hasError: titleInputHasError,
    valueChangeHandler: titleChangeHandler,
    inputBlurHandler: titleBlurHandler,
    reset: resetTitleInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: images,
    isValid: enteredImageIsValid,
    hasError: imageInputHasError,
    valueChangeHandler: imageChangeHandler,
    inputBlurHandler: imageBlurHandler,
    reset: resetImageInput,
  } = useInput((value) => value.includes('.jpg'));

  const {
    value: caption,
    isValid: enteredCaptionIsValid,
    hasError: captionInputHasError,
    valueChangeHandler: captionChangeHandler,
    inputBlurHandler: captionBlurHandler,
    reset: resetCaptionInput,
  } = useInput((value) => value.trim() !== "");

  let formIsValid = false;

  if(enteredTitleIsValid && enteredImageIsValid && enteredCaptionIsValid) {
      formIsValid = true;
  }

  const registerHandler = async (event) => {
    event.preventDefault(); 

    if(!enteredTitleIsValid && !enteredImageIsValid && !enteredCaptionIsValid) {
        return;
    }

    const token = localStorage.getItem('token');
    console.log(token);
    const result = await fetch("/create-post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token
      },
      body: JSON.stringify({
        title,
        images,
        caption,
      })
    });
    const data = await result.json();

    console.log(data);

    if(data.message === 'Forbidden Access Denied!') {
        window.alert('User not verified!');
    }
    else if (data.status === 403 || !data) {
      window.alert("Post cannot be created!");
      console.log("Post cannot be created!");
    } else {
      window.alert("Post created successfully!");
      console.log("Post created successfully!");

      history.push("/mainPage");
    }
    resetTitleInput();
    resetImageInput();
    resetCaptionInput();
  };

  const titleClasses = titleInputHasError 
  ? "form-control invalid"
  : "form-control";

  const imageClasses = imageInputHasError
  ? "form-control invalid" 
  : "form-control";

  const captionClasses = captionInputHasError
  ? "form-control invalid" 
  : "form-control";

  return (
    <form method="POST">
      <div className={titleClasses}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          onChange={titleChangeHandler}
          onBlur= {titleBlurHandler}
          value={title}
        />
        {titleInputHasError && <p>Password field cannot be empty!</p>}
      </div>
      <div className={imageClasses}>
        <label htmlFor="images">Image</label>
        <input
          type="text"
          id="images"
          onChange={imageChangeHandler}
          onBlur= {imageBlurHandler}
          value={images}
        />
        {imageInputHasError && <p>Image field cannot be empty</p>}
      </div>
      <div className={captionClasses}>
        <label htmlFor="caption">Caption</label>
        <input
          type="text"
          id="caption"
          onChange={captionChangeHandler}
          onBlur= {captionBlurHandler}
          value={caption}
        />
        {captionInputHasError && <p>Put some caption!</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid} onClick={registerHandler}>Create</button>
      </div>
    </form>
  );
};

export default Posts;
