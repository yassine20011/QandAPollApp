import { useState, useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { Label, TextInput, Button } from 'flowbite-react';

interface InputField {
	id: number;
	label: string;
	value: string;
}

interface DynamicInputProps {
	label: string;
	endpoint: string;
	question_id?: number;
	option_id?: number;
}

export default function DynamicInput(props: DynamicInputProps) {
	const { authTokens }: any = useContext(AuthContext);
	const [inputFields, setInputFields] = useState<InputField[]>([
		{ id: 1, label: props.label, value: "" },
	]);

	const session = localStorage.getItem("session");

	// get questions from backend
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					`http://127.0.1:8000/${props.endpoint}/`,
					{
						params: {
							session: session,
							option_id: props.option_id,
						},
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${authTokens.access as string}`,
						},
					}
				);
				if (response.status === 200) {
					const data = response.data.map((item: any) => [
						item.question,
						item.id,
						item.isNew,
					]);
					const newInputFields = data.map((item: any) => ({
						id: item[1],
						label: props.label,
						value: item[0],
						isNew: item[2],
					}));

					newInputFields.push({ id: 1, label: props.label, value: "" });
					setInputFields(newInputFields);
					localStorage.setItem(props.endpoint, JSON.stringify(newInputFields));
				}
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, []);

	// Handle form submission and send data to backend
	const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			const response = await axios.put(
				`http://127.0.1:8000/${props.endpoint}/`,
				{
					session: session,
					data: inputFields.filter(({ value, label }) => value && label === props.label),
					option_id: props.option_id,
				},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${authTokens.access as string}`,
					},
				}
			);
			if (response.status === 201) {
				const data = response.data.map((item: any) => [item.question, item.id]);
				const newInputFields =
					data.length === 0
						? [{ id: 1, label: props.label, value: "" }]
						: data.map((item: any) => ({
							id: item[1],
							label: props.label,
							value: item[0],
						}));
				newInputFields.push({ id: 1, label: props.label, value: "" });
				setInputFields(newInputFields);
			}
		} catch (error: any) {
			console.log(error.response);
		}
	};

	const handleDelete = async (inputField: number, event: React.FormEvent) => {
		event.preventDefault(); // Prevent the default form submission behavior
		try {
			if (inputField === 1) {
				const values = [...inputFields];
				const index = values.findIndex((item) => item.id === inputField);
				values.splice(index, 1);
				setInputFields(values);
			} else {
				const response = await axios.delete(
					`http://127.0.1:8000/${props.endpoint}/`,
					{
						data: {
							session: session,
							inputField: inputField,
							option_id: props.option_id,
						},
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${authTokens.access as string}`,
						},
					}
				);

				if (response.status === 204) {
					const values = [...inputFields];
					const index = values.findIndex((item) => item.id === inputField);
					values.splice(index, 1);
					setInputFields(values);
				}
			}
		} catch (error: any) {
			console.log(error.response);
		}
	};

	const handleOnChange = (event: any, index: number) => {
		const values = [...inputFields];
		values[index].value = event.target.value;
		setInputFields(values);

		if (inputFields[inputFields.length - 1].value !== "") {
			setInputFields([
				...inputFields,
				{
					id: inputFields[inputFields.length - 1].id + 1,
					label: props.label,
					value: "",
				},
			]);
		} 
	};

	const renderInputFields = () => {
		return inputFields.map((inputField, index) => (
			<div key={inputField.id} className="space-y-2">
				<Label htmlFor={`${inputField.label}-${inputField.id}-input`} className="lg:w-96 sm:w-64 w-32">
					{inputField.label + " " + (index + 1)}
				</Label>
				<TextInput
					id={`${inputField.label}-${inputField.id}-input`}
					className="w-96"
					value={inputField.value}
					onChange={(event) => handleOnChange(event, index)}
					placeholder="Enter your question"
				/>
				<Button

					onClick={(event) => handleDelete(inputField.id, event)}
				>
					Delete
				</Button>
			</div>
		));

	};

	return (
		<>
			<form onSubmit={handleOnSubmit} className="flex flex-col justify-center items-center bg-gray-100 p-4 sm:p-8 m-4 sm:m-8">
				{renderInputFields()}
				<div className="relative w-full sm:w-96 h-12">
					<Button size="sm" className="absolute bottom-0 right-0" type="submit">
						Save
					</Button>
				</div>
			</form>
		</>
	);
}
