import { useCallback, useMemo, useState } from 'react';

const useToggle = (initialValue?: boolean) => {
    const [status, setStatus] = useState(initialValue ?? false);

    const toggleStatus = useCallback(() => {
        setStatus((prevStatus) => !prevStatus);
    }, []);

    const values = useMemo(
        () => ({
            status,
            toggleStatus,
        }),
        [status, toggleStatus]
    );

    return values;
};

export default useToggle;
