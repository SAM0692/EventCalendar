import { Button } from "@material-ui/core";
import { FC } from "react";

type ViewButtonsProps = {
    onEditClick: Function
}

const ViewButtons: FC<ViewButtonsProps> = ({ onEditClick }) => {
    return (
        <div>
            <Button onClick={() => { onEditClick() }} >Edit</Button>
        </div>
    )
}

export default ViewButtons;