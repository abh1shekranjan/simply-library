import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import TextField from '@material-ui/core/TextField';
import { useState } from 'react';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

export default function PasswordTextField(props) {
    const { value, onChange, className } = props;
    const [showPassword, setShowPassword] = useState(false);
    return (
        <TextField
            value={value}
            onChange={(e) => onChange(e.target.value)}
            label="Password"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            className={(className ? className : "") + " text-field-80"}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label="toggle password visibility"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                )
            }}
        />
    )
}