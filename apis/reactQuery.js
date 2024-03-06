import { useQuery } from '@tanstack/react-query';

export default function reactQuery(qKey, qFn) {
    const { data, isLoading, error, isFetching} = useQuery({ 
        queryKey: [`${qKey}`], 
        queryFn: () => qFn ,
        gcTime: 10000,
    });
      
    console.log({isLoading, isFetching, error, data});
    
    return data
}