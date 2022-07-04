import './App.css';
import axios from 'axios';

function Task(props) {

    const remove = async (id) => {
        const task = document.getElementById(id).parentElement;
        task.remove();
        await axios.delete(`/todo/${id}`)
            .then(response => {
                console.log(response.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const salva = async (id) => {
        const input = document.getElementById('input-' + id);
        const check = document.getElementById('check-' + id);      
        var data = JSON.stringify({
            "tarefa": input.value,
            "check": check.value
        });
        console.log(data);
        var config = {
            method: 'put',
            url: `/todo/${id}`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        await axios(config)
            .then(response => {
                console.log(response.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <div>
            {props.data && (
                <div className='task-container'>
                    <input type='checkbox' id={'check-' + props.data.id} value={props.data.check}></input>
                    <input id={'input-' + props.data.id} defaultValue={props.data.tarefa}></input>
                    <button onClick={() => remove(props.data.id)} id={props.data.id} className='btn-x'><span>❌</span></button>
                    <button onClick={() => salva(props.data.id)} id={props.data.id} className='btn-edit'><span>✔️</span></button>
                </div>

            )}
        </div>
    );
}

export default Task;