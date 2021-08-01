import React from "react";
import {Controller} from "react-hook-form";
import {Form} from "semantic-ui-react";

type InputProps = {
    control: any,
    name: string,
    type?: string,
    icon?: string,
    placeholder?: string,
}

const Input = ({ control, name, type, icon, placeholder }: InputProps) => (
    <Controller
        control={control}
        name={name}
        render={({field, fieldState: { error }}) => (
            <>
                <Form.Input
                    type={type}
                    iconPosition='left'
                    fluid
                    icon={icon}
                    placeholder={placeholder}
                    error={error?.message}
                    {...field}
                />
            </>
        )}
    />
)

export default Input;
