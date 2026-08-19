import { useMemo, useRef, useState } from 'react';

const MIN_ITEMS = 10;
const MAX_ITEMS = 50;

function createFibonacciNumbers(count: number) {
	const numbers = [1, 1];

	for (let i = 2; i < count; i++) {
		numbers.push((numbers[i - 1] ?? 0) + (numbers[i - 2] ?? 0));
	}

	return numbers.slice(0, count);
}

function ScrollableItems() {
	const [count, setCount] = useState(30);
	const [activeIndex, setActiveIndex] = useState(0);

	const itemsRef = useRef<HTMLDivElement>(null);

	const numbers = useMemo(() => createFibonacciNumbers(count), [count]);

	const handleCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = Number(event.target.value);

		if (!value) return;

		const nextCount = Math.min(MAX_ITEMS, Math.max(MIN_ITEMS, value));

		setCount(nextCount);

		if (activeIndex >= nextCount) {
			setActiveIndex(nextCount - 1);
		}
	};

	const handleItemClick = (index: number) => {
		setActiveIndex(index);

		const container = itemsRef.current;
		const item = container?.children[index] as HTMLElement;

		item?.scrollIntoView({
			behavior: 'smooth',
			block: 'nearest',
			inline: 'center',
		});
	};

	return (
		<div className='min-h-screen bg-[#f6f6f8] flex items-center justify-center p-6'>
			<div className='w-full max-w-[800px]'>
				<div className='mb-4 flex items-center justify-center gap-2'>
					<label
						htmlFor='item-count'
						className='text-xs text-gray-500'
					>
						Number of items:
					</label>

					<input
						id='item-count'
						type='number'
						min={MIN_ITEMS}
						max={MAX_ITEMS}
						value={count}
						onChange={handleCountChange}
						className='
              h-7
              w-14
              rounded
              border
              border-gray-300
              bg-white
              px-2
              text-center
              text-xs
              text-gray-700
              outline-none
              transition
              focus:border-gray-500
              focus:ring-1
              focus:ring-gray-200
            '
					/>
				</div>

				<div className='rounded-xl bg-white p-4 shadow-[0_8px_30px_rgba(0,0,0,0.08)]'>
					<div
						ref={itemsRef}
						className='flex gap-3 overflow-x-auto scroll-smooth y-1 px-1 scrollbar-none'
					>
						{numbers.map((number, index) => {
							const active = index === activeIndex;
							const itemId = `${number}-${index}`;
							return (
								<button
									key={itemId}
									type='button'
									onClick={() => handleItemClick(index)}
									className={`group relative flex h-20 min-w-20 shrink-0 items-center justify-center 
                                        rounded-lg border text-sm transition-all duration-300 ease-out

                    ${
						active
							? `
                          border-[#4caf50]
                          bg-[#4caf50]
                          text-white
                          shadow-[0_6px_16px_rgba(76,175,80,0.25)]
                          -translate-y-0.5
                        `
							: `
                          border-gray-200
                          bg-white
                          text-gray-600
                          hover:-translate-y-1
                          hover:border-gray-300
                          hover:shadow-[0_6px_16px_rgba(0,0,0,0.08)]
                        `
					}
                  `}
								>
									<span
										className='
                      transition-transform
                      duration-300
                      ease-out
                      group-hover:scale-105
                    '
									>
										{number.toLocaleString('en-US')}
									</span>
								</button>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}

export default ScrollableItems;
