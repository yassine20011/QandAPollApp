import DynamicInput from "./dynamicInput";
import { Link } from "react-router-dom";
import { Button } from 'flowbite-react';

function Question() {

    return (
        <>
            <DynamicInput label="Question" endpoint="questions" />
            <div className="flex flex-wrap">
                <Link to="/view/question/options">
                    <Button 
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded absolute bottom-50 right-20"
                        size="sm"
                        color="primary"
                    >
                        Next
                    </Button>
                </Link>
            </div>
        </>
    );
}

export default Question;
