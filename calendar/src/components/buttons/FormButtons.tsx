import "../../css/formButtons.css";
import { FC } from "react";
import { Button } from "@material-ui/core";

type FormButtonsProps = {
    isCreating: boolean,
    canSave: boolean,
    canCancel: boolean,
    onSaveClick: Function,
    onCancelClick: Function,
    onClearClick: Function
}

const FormButtons: FC<FormButtonsProps> = ({ isCreating, canSave, canCancel, onSaveClick, onCancelClick, onClearClick }) => {

    return (
        <div className="form-button-group">
            <Button className="form-button" variant="outlined" color="primary" size="small"
                disabled={!canSave} onClick={() => { onSaveClick() }} >Save</Button>
            {
                isCreating
                    ? (<div />)
                    : (
                        <Button className="form-button" variant="outlined" color="secondary" size="small"
                            disabled={!canCancel} onClick={() => { onCancelClick() }} >Cancel</Button>
                    )
            }
            <Button className="form-button" variant="outlined" size="small"
                onClick={() => { onClearClick() }} >Clear</Button>
        </div>
    )
}

export default FormButtons;