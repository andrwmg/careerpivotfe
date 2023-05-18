import { FormatListBulleted, StarBorderOutlined, StarOutlined } from "@mui/icons-material";
import { Box, Card, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import { Stack } from "@mui/system";

export default function PostSidebar({ post }) {

    return (
        <Card sx={{ width: '335px', maxHeight: '100%', overflow: 'scroll', color: 'black', p: 3, border: '1px solid #E8EBFF', boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)', flexGrow: 1 }}>
            {post ?
                <Grid container item direction='column' alignItems='start' xs={12} rowGap={3} height='fit-content' maxWidth='100%'>
                    <Stack gap={1} maxWidth='100%'>
                        <Typography variant="h4" fontWeight={700} noWrap lineHeight='35px' textAlign='start'>
                            {/* {post.group.title} */}
                            {post.career}
                        </Typography>
                        <Typography variant='body2' color='text.secondary' lineHeight='20px' textAlign='start'>
                            {/* {post.group.tagline} */}
                            The end-to-end design of digital products like responsive websites, mobile apps, etc. Let’s chat about UI, UX, Interaction, research, etc!
                        </Typography>
                    </Stack>
                    <Grid container item width='100%'>
                        <Divider />
                        <Typography variant='body2' color='text.secondary' lineHeight='20px' textAlign='start'>
                            {/* {`${post.group.members.length} members`} */}
                            255 members
                        </Typography>
                        <Divider />
                    </Grid>
                    <Stack gap={1} maxWidth='100%'>
                        <Stack direction='row' spacing={2} alignItems='center'>
                            <StarBorderOutlined />
                            <Typography variant="h4" fontWeight={700} noWrap lineHeight='35px' textAlign='start'>Group Guidelines</Typography>
                        </Stack>
                        <ul>
                            <li>
                                <Typography variant="body2" textAlign='start'>
                                    Be kind and respectful toward one another.
                                </Typography>
                                </li>
                                <li>
                                <Typography variant="body2" textAlign='start'>
                                    Derogatory, racist, sexist, hateful and demeaning language and insinuations are not tolerated.
                                </Typography>
                                </li>
                                <li>
                                <Typography variant="body2" textAlign='start'>
                                    Sexually inappropriate comments are not allowed.
                                </Typography>
                                </li>
                                <li>
                                <Typography variant="body2" textAlign='start'>
                                    Content that poses danger to any individual or individuals is not allowed.
                                </Typography>
                                </li>
                                <li>
                                <Typography variant="body2" textAlign='start'>
                                    Please try and be helpful. Unhelpful criticism is not welcome.
                                </Typography>

                            </li>
                        </ul>
                    </Stack>


                </Grid>
                : null}
        </Card>
    )
}