import { Button } from "../ui/button";
import { decrement, increment, incrementByAmount, reset } from "@/store/slices/counter";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export const Counter = () => {
    const dispatch = useAppDispatch();
    const counter = useAppSelector((state) => state.counter.value);
    return (
        <div>
            Value: {counter}
            <div>
                <Button onClick={() => dispatch(increment())}>increment</Button>
                <Button onClick={() => dispatch(decrement())}>decrement</Button>
                <Button onClick={() => dispatch(incrementByAmount(2))}>amount</Button>
                <Button onClick={() => dispatch(reset())}>reset</Button>
            </div>
        </div>
    )
}