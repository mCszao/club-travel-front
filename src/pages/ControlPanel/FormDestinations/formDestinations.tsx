import { IDestination } from '@/shared/Interface/IDestionation';
import { IReference } from '@/shared/Interface/IReference';
import { CityService, DestinationsService } from '@/shared/services';
import { ICity } from '@/shared/services/city/CityService';
import { Console } from 'console';

import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { IoMdCloseCircle } from 'react-icons/io';
import { BoxReferenceField } from './BoxReferenceField/boxReferenceField';
import { ResponseCityItem } from './ResponseCityItem/responseCityItem';
import { ResponseCityList } from './ResponseCityList/responseCityList';

export const FormDestinations = () => {
    const [listOpen, setListOpen] = React.useState(false);
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        getValues,
        control,
        reset,
        resetField,
        formState: { errors },
    } = useForm<IDestination>();
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'references',
    });

    const [citiesList, setCitiesList] = React.useState<ICity[]>([]);
    const handleSearchCities = async (query: string) => {
        const response = await CityService.getCityByName(query);
        setCitiesList(response.data);
    };
    const removeReference = (indexRef: number) => {
        remove(indexRef);
    };

    const createNewDestination = (data: IDestination) => {
        console.log(data);
        const { references, nameCity } = data;
        if (!nameCity) {
            alert('Você precisa escolher uma cidade');
            return;
        }
        if (!references || references.length === 0) {
            alert('É obrigatório que o destino tenha no mínimo 1 referência.');
            return;
        }
        try {
            DestinationsService.postDestinations(data);
            alert('Destino cadastrado com sucesso!');
            reset();
            remove();
        } catch (error) {
            alert('Não foi possível concluir a operação');
            console.error(error);
        }
    };
    React.useEffect(() => {
        const updateList = watch((data) => {
            if (!data.nameCity || data.nameCity?.length <= 3) {
                return;
            }
            handleSearchCities(data.nameCity!);
        });
    }, [watch('nameCity')]);

    return (
        <div className='w-full flex mt-5 justify-center'>
            <form
                onSubmit={handleSubmit(createNewDestination)}
                className='bg-gray-300 flex flex-col p-2 rounded-md w-1/2 gap-2 border-2 border-black m-2'
            >
                <div className='flex flex-col justify-center w-full items-center'>
                    <label className='text-2xs font-bold ' htmlFor='title'>
                        Cidade
                    </label>

                    <input
                        className='w-64 md:w-1/2 p-1 rounded-md bg-slate-200 focus:bg-white border border-black'
                        type='text'
                        id='nameCity'
                        {...register('nameCity', { required: true })}
                    />
                    {errors.nameCity && (
                        <span>É obrigatório selecionar 1 cidade</span>
                    )}
                    {citiesList.length > 1 && (
                        <ResponseCityList>
                            {citiesList.map((cities, index) => (
                                <ResponseCityItem
                                    key={index}
                                    idCity={cities.idCity}
                                    name={cities.name}
                                    externalFunc={() => {
                                        setListOpen(!listOpen);
                                        setValue('nameCity', cities.name);
                                    }}
                                />
                            ))}
                        </ResponseCityList>
                    )}
                </div>
                <BoxReferenceField
                    callbackReset={() => {}}
                    callAdd={() =>
                        append({
                            keyReference: '',
                            imageLink: '',
                            valor: '',
                        })
                    }
                    childrens={fields.map((field, index) => {
                        return (
                            <div
                                key={field.id}
                                className='flex flex-col justify-center w-full gap-2 items-center  border-2 bg-blue-400 rounded-md border-slate-100 p-2'
                            >
                                <div className='flex justify-center w-full gap-2 items-center '>
                                    <label
                                        className='text-2xs font-bold flex justify-start'
                                        htmlFor={`references.${index}.keyReference`}
                                    >
                                        Título Referência
                                    </label>
                                    <input
                                        className='w-64 md:w-1/2 p-1 rounded-md bg-slate-200 focus:bg-white border border-black'
                                        type='text'
                                        id='title'
                                        {...register(
                                            `references.${index}.keyReference`
                                        )}
                                    />
                                    <label
                                        className='text-2xs font-bold flex justify-start'
                                        htmlFor={`references.${index}.imageLink`}
                                    >
                                        Link da Imagem
                                    </label>
                                    <input
                                        className='w-64 md:w-1/2 p-1 rounded-md bg-slate-200 focus:bg-white border border-black'
                                        type='text'
                                        id='title'
                                        {...register(
                                            `references.${index}.imageLink`
                                        )}
                                    />
                                    <button
                                        type='button'
                                        className='relative -top-5 left-1'
                                        onClick={() => removeReference(index)}
                                    >
                                        <IoMdCloseCircle
                                            size='1.3em'
                                            color='red'
                                        />
                                    </button>
                                </div>
                                <div className='w-full flex flex-col items-center justify-center '>
                                    <label
                                        className='text-2xs font-bold '
                                        htmlFor={`references.${index}.valor`}
                                    >
                                        Conteúdo
                                    </label>
                                    <textarea
                                        className='h-44 w-full p-1 rounded-md bg-slate-200 focus:bg-white border border-black'
                                        id='title'
                                        {...register(
                                            `references.${index}.valor`
                                        )}
                                    />
                                </div>
                            </div>
                        );
                    })}
                />
                <div className='flex justify-center'>
                    <input
                        type='submit'
                        className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-3/4'
                    />
                </div>
            </form>
        </div>
    );
};
