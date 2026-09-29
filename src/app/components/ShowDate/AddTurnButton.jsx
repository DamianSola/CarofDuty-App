import Button from "../ui/Button";

const AddButton = ({show, handleSubmitTrun}) => {
    const submit = () => {
        handleSubmitTrun();
    }

    return(
        <div className="w-full justify-center p-4">
            <Button
                className="w-full"
                disabled={!show}
                aria-disabled={!show}
                onClick={submit}
            >
                Sacar turno
            </Button>
        </div>
    )
}

export default AddButton;
