import Heading from '@/components/shared/heading';
import {Button} from '@/components/ui/button';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {Customer} from "../../../../amplify/utils/model.ts";
import {FunctionComponent} from "react";
import {CalendarIcon} from "lucide-react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {cn} from "@/lib/utils.ts";
import {Calendar} from "@/components/ui/calendar.tsx";
import {format} from "date-fns";
import {addCustomer, updateCustomer} from "../../../../amplify/utils/queryUtils.ts";

const customerFormSchema = z
    .object({
        email: z.string().email({message: 'Enter a valid email address'}),
        name: z.string().min(1, {message: 'name is required'}),
        //TODO phone validation regex
        phone: z.string().min(1, {message: 'Enter a valid phone number'}),
        birthdate: z.date(),
        gender: z.string(),
        pk: z.string().min(10, {message: 'pk is required'}),
        sk: z.string().min(10, {message: 'sk is required'})
    })

type CustomerFormSchemaType = z.infer<typeof customerFormSchema>;

type Props = {
    initialValues?: Customer;
    closeModal: () => void;
    onSubmitNotify: (data: Customer) => void;
    mode: 'create' | 'edit';
};

const CustomerForm: FunctionComponent<Props> = ({
                                                    initialValues,
                                                    closeModal,
                                                    onSubmitNotify,
                                                    mode,
                                                }) => {


    const form = useForm<CustomerFormSchemaType>({
        resolver: zodResolver(customerFormSchema),
        defaultValues: {
            email: initialValues?.email || '',
            name: initialValues?.name || '',
            phone: initialValues?.phone || '',
            birthdate: initialValues ? new Date(initialValues?.birthdate) : new Date(),
            gender: initialValues?.gender || '',
            pk: initialValues?.pk || '',
            sk: initialValues?.sk || '',
        }
    });


    const formatToDateString = (date:Date):string => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const onSubmit = async (values: CustomerFormSchemaType) => {
        //console.log(values);

        let response:Customer;
        if (mode === 'create') {
            // create response
            response = await addCustomer(values.pk, values.sk, formatToDateString(values.birthdate), values.email, values.gender, values.name, values.phone);
        } else {
            // update response
            response =  await updateCustomer(values.pk, values.sk, formatToDateString(values.birthdate), values.email, values.gender, values.name, values.phone);
        }
        if (response) {
            onSubmitNotify(response);
            closeModal();
        }
    };

    return (
        <div className="px-2">
            <Heading
                title={mode === 'create' ? 'Create Customer' : 'Update Customer'}
                className="space-y-2 py-4 text-center"
            />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                        <FormField
                            control={form.control}
                            name="pk"
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter pk"
                                            {...field}
                                            className=" px-4 py-6 shadow-inner drop-shadow-xl"
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="sk"
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter sk"
                                            {...field}
                                            className=" px-4 py-6 shadow-inner drop-shadow-xl"
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter email"
                                            {...field}
                                            className=" px-4 py-6 shadow-inner drop-shadow-xl"
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="name"
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter name"
                                            {...field}
                                            className=" px-4 py-6 shadow-inner drop-shadow-xl"
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Phone Number</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter phone"
                                            {...field}
                                            className=" px-4 py-6 shadow-inner drop-shadow-xl"
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="birthdate"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Birthdate</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={'outline'}
                                                    className={cn(
                                                        'w-full px-4 py-6 shadow-inner drop-shadow-xl flex items-center justify-between',
                                                        !field.value && 'text-muted-foreground'
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(field.value, 'PPP')
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className='w-4 h-4 ml-auto opacity-50'/>
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className='w-auto p-0' align='start'>
                                            <Calendar
                                                mode='single'
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date: any) =>
                                                    date > new Date() || date < new Date('1900-01-01')
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="gender"
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter gender"
                                            {...field}
                                            className=" px-4 py-6 shadow-inner drop-shadow-xl"
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>


                    <div className="flex items-center justify-center gap-5">
                        <Button
                            type="button"
                            variant="secondary"
                            className="rounded-full bg-gray-400 hover:bg-gray-500 text-white"
                            size="lg"
                            onClick={closeModal}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" className="rounded-full" size="lg">
                            {mode === 'create' ? 'Create' : 'Update'}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default CustomerForm;