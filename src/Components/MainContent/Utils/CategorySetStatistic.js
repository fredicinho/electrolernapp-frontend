import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {RadialBarChart} from "recharts";
import {RadialBar} from "recharts";
import {Legend} from "recharts";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function CategorySetStatistic(props) {
    const classes = useStyles();
    const [selectedCategorySet, setCategorySet] = React.useState('');
    const [chardOfCategorySet, setChard] = React.useState([]);

    const handleChange = (event) => {
        let categorySet = props.categorySets.filter((categorySet) => {return (categorySet.categorySetId === event.target.value)})
        let selectedCategorySet = categorySet[0];
        console.log("Selected categorySet")
        console.log(selectedCategorySet)
        let data = [{
            name: "Übungen absolviert (in %)",
            number: Math.round((selectedCategorySet.numberOfQuestionsSolved/selectedCategorySet.numberOfQuestions) * 100),
            "fill": "#03a9f4"
        },
            {
                name: 'Übungen markiert (in %)',
                number: Math.round((selectedCategorySet.numberOfQuestionsMarked / selectedCategorySet.numberOfQuestions) * 100),
                "fill": "#0014ff"
            },
            {
                name: 'Punkte erreicht (in %)',
                number: Math.round((selectedCategorySet.pointsAchieved / selectedCategorySet.maximalNumberOfPoints) * 100),
                "fill": "#08135f"
            },
];

        setCategorySet(event.target.value);
        setChard(data);
    };


    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Übungsset</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedCategorySet}
                    onChange={handleChange}
                >
                    {Object.values(props.categorySets).map((categorySet) => {
                        if (categorySet.numberOfQuestionsSolved !== 0) {
                            return(<MenuItem value={categorySet.categorySetId}>{categorySet.title}</MenuItem>);
                        }
                    })}
                </Select>
                {chardOfCategorySet &&
                <RadialBarChart
                    width={1000}
                    height={400}
                    innerRadius="10%"
                    outerRadius="80%"
                    data={chardOfCategorySet}
                    startAngle={180}
                    endAngle={0}
                >
                    <RadialBar minAngle={15} label={{ fill: '#666', position: 'insideStart' }} background clockWise={true} dataKey='number' />
                    <Legend iconSize={10} width={120} height={140} layout='vertical' verticalAlign='middle' align="right" />
                    <Tooltip />
                </RadialBarChart>
                }
            </FormControl>
        </div>
    );
}