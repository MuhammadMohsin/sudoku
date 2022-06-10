import { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

function NewGame({ generateGame }) {

    const [diffLevel, setLevel] = useState('easy');

    return (
        <div className="new-game-container">

            <FormControl sx={{ minWidth: 150 }} size="small" style={{color: 'white'}}>
                <InputLabel id="diffLev">Difficulty Level</InputLabel>
                <Select
                    labelId="diffLev"
                    id="diffLev"
                    value={diffLevel}
                    label="Difficulty Level"
                    onChange={(e) => setLevel(e.target.value)}
                >
                    <MenuItem value={'easy'}>Easy</MenuItem>
                    <MenuItem value={'medium'}>Medium</MenuItem>
                    <MenuItem value={'hard'}>Hard</MenuItem>
                    <MenuItem value={'random'}>Random</MenuItem>
                </Select>
            </FormControl>

            <Button variant="contained"
                onClick={() => { generateGame(diffLevel) }}>Generate
            </Button>
        </div>
    );
}

export default NewGame;
