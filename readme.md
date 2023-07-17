# Props of Components

> ## Component **Button**

Renders a button in the interface and accepts the following properties:

| Prop name | Type     | Description                                                                                        | Mandatory | Default   |
| --------- | -------- | -------------------------------------------------------------------------------------------------- | --------- | --------- |
| text      | String   | This property represents the text displayed on the screen.                                         | required  | ""        |
| onClick   | Function | This property is the action that the button will perform when clicked.                             | required  | undefined |
| fill      | Boolean  | This property receives true if the button will be filled and false if the button will be outlined. | Optional  | true      |

Example code:

```tsx
<Button
	text='Add to cart'
	onClick={() => console.log('added to cart')}
	fill={false}
/>
```

---

> ## Component **Form**

Renders a form in the interface and accepts the following properties:

| Prop name | Type               | Description                                                                       | Mandatory | Default   |
| --------- | ------------------ | --------------------------------------------------------------------------------- | --------- | --------- |
| title     | String             | This property prints the form title on the screen. It is displayed as an h2.      | Optional  | null      |
| fields    | FormField[]        | This property receives an array of FormField type with the fields to be rendered. | required  | undefined |
| onSubmit  | Function           | This property is the action that the form will perform when submitted.            | required  | undefined |
| button    | JSX Button Element | This property displays the form button on the screen.                             | required  | undefined |
| errors    | Object             | This property receives an array with the errors per field.                        | Optional  | undefined |

Example code:

```TSX
<Form title="Login" fields={loginFields} onSubmit={handleSubmit} button={<Button text='Sign In' onClick={(e) => console.log("sign in")} fill={true} />} />
```

> FormField Object

It is an interface for form fields and accepts the following properties:

| Prop name   | Type                                                          | Description                                                | Mandatory | Default   |
| ----------- | ------------------------------------------------------------- | ---------------------------------------------------------- | --------- | --------- |
| name        | string This property receives the name to identify the input. | required                                                   | undefined |
| type        | string                                                        | This property receives the type of the input.              | required  | undefined |
| label       | string                                                        | This property receives the label text for the input.       | required  | undefined |
| placeholder | string                                                        | This property receives the placeholder text for the input. | Optional  | undefined |
| value       | string                                                        | This property receives an optional value for the input.    | Optional  | undefined |
| options     | optionField[]                                                 | This property is required for select fields.               | Optional  | undefined |

Example code:

```tsx
const loginFields: FormField[] = [
    {
        name: 'Name',
        type: 'text',
        label: 'Full Name',
    },
    {
        name: 'Carreer',
        type: 'text',
        label: 'Carreer',
    },
];

```

> optionField Object

|Key|Type|Mandatory|Default|
|---|----|---------|-------|
|value|`String`|required|`undefined`|
|label|`String`|required|`undefined`|

Example code:

```tsx
const loginFields: FormField[] = [
    {
        name: 'Food',
        type: 'select'
        label: 'Food',
        oprions: [
            {
                value: 'hotDog',
                label: 'Hot Dog'
            },
            {
                value: 'burger',
                label: 'Burger'
            }
        ]    
    }
];