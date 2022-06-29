function Profile(props) {

    const remove = () => {
        const profileCard = document.getElementById(props.data.id);
        profileCard.remove();
    }

    return (
        <div className="card-container" id={props.data.id}>
          <button className="btn-x" onClick={remove}><span>X</span></button>
          <img className="profile-img" src={props.data.avatar_url} alt="user" />
          <h3>{props.data.name}</h3>
          <p>{props.data.bio}</p>
        </div>
    );
}

export default Profile;