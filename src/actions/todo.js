import axios from 'axios';
import Config from '../helpers/config';

export const AddTodo = (action, cb) => {
    const Url = `${Config.baseUrl}/todo`;
    axios.post(Url, {
        "Item": {
            "todo": action.task,
            "isDone": false
        }
    }, {
        headers: {
            app_user_id: action.uid,
        }
    })
        .then(res => res.data)
        .then(data => {
            cb(data);
        })
        .catch(err => {
            console.log(err);
            cb(false);
        })
}

export const GetTodos = (action, cb) => {
    const Url = `${Config.baseUrl}/todos`;
    axios.get(Url, {
        headers: {
            app_user_id: action.uid,
        }
    })
        .then(res => res.data)
        .then(data => {
            cb(data);
        })
        .catch(err => {
            console.log(err);
            cb([]);
        })
}

export const EditTodo = (action, cb) => {
    const Url = `${Config.baseUrl}/todo`;
    axios.patch(Url, {
        "Item": action.data
    }, {
        headers: {
            app_user_id: action.uid,
        }
    })
        .then(res => res.data)
        .then(data => {
            cb(data);
        })
        .catch(err => {
            console.log(err);
            cb(false);
        })
}

export const DeleteTodo = (action, cb) => {
    const Url = `${Config.baseUrl}/todo/t/${action.tid}`;
    axios.delete(Url, {
        headers: {
            app_user_id: action.uid,
        }
    })
        .then(res => res.data)
        .then(data => {
            cb(true);
        })
        .catch(err => {
            console.log(err);
            cb(false);
        })
}