import React, { useEffect, useState } from 'react'
import Select, { components } from 'react-select';

type Props = {
    options: any
    setField: (e: any) => void
    name: string
}

const SelectInput = ({ options, setField, name }: Props) => {
    const [isMounted, setIsMounted] = useState(false);
    const { ClearIndicator } = components;

    useEffect(() => setIsMounted(true), []);

    return isMounted ? (
        <div className='w-full flex justify-between gap-4'>
            <label htmlFor="description">{name}: </label>
            <Select
                defaultValue={null}
                options={options}
                onChange={(e: any) => setField(e.label.toLowerCase())}
                components={{ ClearIndicator }}
                isClearable
                placeholder={name}
                className='w-2/3'
            />
        </div>
    ) : null;


}

export default SelectInput