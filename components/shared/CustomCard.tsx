'use client';

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
} from '@nextui-org/react';

type CustomCardProps = {
  name: string;
  email: string;
};

const CustomCard = ({ name, email }: CustomCardProps) => {
  return (
    <Card className='max-w-[600px] min-w-[600px]'>
      <CardHeader className='flex gap-3 justify-center'>
        <div className='flex justify-center'>{`WELCOME ${name}`}</div>
      </CardHeader>
      <Divider />
      <CardBody className='flex justify-center items-center'>
        <div>{`Email: ${email}`}</div>
      </CardBody>
      <Divider />
      <CardFooter className='flex justify-center'></CardFooter>
    </Card>
  );
};

export default CustomCard;
