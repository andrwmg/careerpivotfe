import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import groupService from '../services/group.service';
import { ToastContext } from '../contexts/ToastContext';
import { useAuthUser } from 'react-auth-kit';

export default function GroupSelector({ size, label, group, setGroup, disabled, error, required }) {

    const { setMessage, setSeverity } = React.useContext(ToastContext)

    const [groups, setGroups] = React.useState([])
    const [inputValue, setInputValue] = React.useState('');

    React.useLayoutEffect(() => {
        groupService.getAll()
            .then(({ data }) => {
                setGroups(data)
                setMessage(data.message)
                setSeverity('success')
            })
            .catch(({ response }) => {
                console.log(response.data.message)
                setMessage(response.data.message)
                setSeverity('error')
            })
    }, [])

    return (
        <div>
            <Autocomplete
                value={group}
                onChange={(event, newValue) => {
                    setGroup(newValue);
                }}
                size={size || 'small'}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                }}
                id="controllable-states-demo"
                options={groups}
                getOptionLabel={(option) => option.title}
                disabled={disabled}
                renderInput={(params) => <TextField fullWidth {...params} error={Boolean(error)} helperText={error} required={required || false} label={label || "Group"} />}
                sx={{'& .MuiAutocomplete-endAdornment': {top: 'auto'}}}
            />
        </div>
    );
}