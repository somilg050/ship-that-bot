import { Card, CardBody, CardFooter, CardHeader } from "@chakra-ui/card";
import { SimpleGrid } from "@chakra-ui/layout";
import { Heading, Text} from "@chakra-ui/react";
import { Button } from "@chakra-ui/button";
import React from "react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Skeleton } from "@chakra-ui/skeleton";
import { Tooltip } from '@chakra-ui/react';

type Reference = {
    title: string;
    url: string;
    excerpt: string;
}
type ReferencesCardProps = {
    references: Reference[];
    isLoading: boolean;
};

const ReferencesCard:React.FC<ReferencesCardProps> = ({references, isLoading}) => {
    return (
    <SimpleGrid pt={'7px'} pl={'10px'} spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
        {isLoading ? (
            Array(3).fill(0).map((_, index) => (
                <Card size={'sm'} key={index}>
                    <CardHeader>
                        <Skeleton height='20px' />
                    </CardHeader>
                    <CardBody>
                        <Skeleton height='60px' />
                    </CardBody>
                    <CardFooter>
                        <Skeleton height='20px' width='60px' />
                    </CardFooter>
                </Card>
            ))
        ) : (
            // Display actual data once it's loaded
            references.map((reference, index) => (
                <Card size={'sm'} key={index}>
                    <CardHeader>
                        <Tooltip label={reference.title} placement="top" hasArrow>
                            <Heading size='sm' noOfLines={1}>{reference.title}</Heading>
                        </Tooltip>
                    </CardHeader>
                    <CardBody>
                        <Text noOfLines={4} fontSize='xs'>{reference.excerpt}</Text>
                    </CardBody>
                    <CardFooter>
                        <Button as='a'
                                href={reference.url}
                                onClick={(e) => {
                                    window.open(reference.url, '_blank');
                                    e.preventDefault(); // Prevent the default anchor tag behaviour
                                }}>Source<ExternalLinkIcon paddingLeft={'2px'}/></Button>
                    </CardFooter>
                </Card>
            ))
        )}
    </SimpleGrid>
    );
}

export default ReferencesCard;


