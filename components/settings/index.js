import styles from '@/styles/Settings.module.scss'
import Context from '@/contexts/Context'
import * as React from 'react'

import { Slider } from '@mui/material'

export default function Settings() {

    const { user } = React.useContext(Context);

    const [age, setAge] = React.useState(user?.findMe?.age);
    const [distance, setDistance] = React.useState(user?.findMe?.distance);
    const [gender, setGender] = React.useState(user?.findMe?.gender);

    const handleAgeChange = (event, newAge) => {
        setAge(newAge)
        user.findMe.age = newAge;
        updatePreferences(user.findMe);
    }

    const handleDistanceChange = (event, newDistance) => {
        setDistance(newDistance)
        user.findMe.distance = newDistance;
        updatePreferences(user.findMe);
    }

    const handleGenderChange = (newGender) => {
        setGender(newGender)
        user.findMe.gender = newGender;
        updatePreferences(user.findMe);
    }

    const updatePreferences = async (findMe) => {
        try {
            await fetch(`/api/user/${user?._id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ findMe })
            })
        }
        catch (error) {
            console.log(error.message)
        }
    };

    return (
        <div className={styles.container}>

            {`Find me:`}
            <br />
            <br />

            <div className={styles.settingContainer}>
                <div>
                    Gender
                </div>
                <div style={{ display: 'flex', maxWidth: '75%' }}>
                    {['Male', 'Female', 'Everyone']
                        .map(choice =>
                            <div key={choice}
                                className={`${styles.choice} ${gender === choice && styles.choiceSelected}`}
                                onClick={() => handleGenderChange(choice)}
                            >
                                {choice}
                            </div>
                        )
                    }
                </div>
            </div>

            <div className={styles.settingContainer}>
                <div>
                    Age
                    <div style={{ fontSize: 'small' }}>
                        {`${age[0]} - ${age[1]}`}
                    </div>
                </div>
                <Slider
                    className={styles.slider}
                    value={age}
                    min={18}
                    max={60}
                    onChange={handleAgeChange}
                    valueLabelDisplay="auto"
                    size="small"
                />
            </div>

            <div className={styles.settingContainer}>
                <div>
                    Distance
                    <div style={{ fontSize: 'small' }}>
                        {`${distance}km`}
                    </div>
                </div>
                <Slider
                    className={styles.slider}
                    value={distance}
                    min={10}
                    max={100}
                    onChange={handleDistanceChange}
                    valueLabelDisplay="auto"
                    size="small"
                />
            </div>

        </div>
    )
}