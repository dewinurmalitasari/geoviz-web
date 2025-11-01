import {createFileRoute, useNavigate, useRouter} from '@tanstack/react-router'
import {Eye, GraduationCap, Pen, Plus, Users} from "lucide-react";
import GeoCard from "@/components/geo/geo-card.tsx";
import GeoButton from "@/components/geo/geo-button.tsx";
import type {User, UsersResponse} from "@/type.ts";
import {DataTable} from "@/components/table/data-table.tsx";
import type {ColumnDef} from "@tanstack/react-table";
import PageHeader from "@/components/root/page-header.tsx";
import {getAuthentication} from "@/lib/auth.ts";
import {userService} from "@/services/user-service.ts";
import {LoadingPage} from "@/components/root/loading-page.tsx";
import {ErrorPage} from "@/components/root/error-page.tsx";
import {ApiError} from "@/lib/api-client.ts";
import AddUserForm from "@/components/form/user/add-user-form.tsx";
import {useMemo, useState} from "react";
import EditUserForm from "@/components/form/user/edit-user-form.tsx";
import DeleteUserForm from "@/components/form/user/delete-user-form.tsx";

export const Route = createFileRoute('/users/')({
    component: RouteComponent,
    pendingComponent: () => <LoadingPage page="Manajemen Akun"/>,
    loader: async () => {
        const auth = getAuthentication();

        // If user role is admin load teacher too
        let teachers: UsersResponse | null = null;
        if (auth?.user.role === 'admin') {
            teachers = await userService.getUsers('teacher');
        }

        const students = await userService.getUsers('student');

        return {students, teachers};
    },
    errorComponent: ({error}) => {
        if (error instanceof ApiError) {
            return (
                <ErrorPage
                    status={error.status}
                    statusText={error.statusText}
                    title="Terjadi Kesalahan memuat data pengguna"
                    message={error.message || "Gagal memuat data pengguna."}
                />
            );
        }

        return (
            <ErrorPage
                status={500}
                statusText="Internal Server Error"
                title="Terjadi Kesalahan memuat data pengguna"
                message={error.message || "Gagal memuat data pengguna."}
            />
        );
    },
})

function RouteComponent() {
    const navigate = useNavigate();
    const router = useRouter();
    const {students, teachers} = Route.useLoaderData();

    // Form Management
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    // Table Columns Definition
    const teacherColumns: ColumnDef<User>[] = useMemo(() => [
        {
            id: 'no',
            header: () => <div className="text-center font-bold">No</div>,
            cell: ({row}) => {
                const index = teachers?.users.findIndex(u => u._id === row.original._id) ?? -1;
                return <div className="text-center">{(teachers?.users.length ?? 0) - index}</div>;
            },
        },
        {
            accessorKey: 'username',
            header: () => <div className="text-start font-bold">Username</div>,
            cell: ({row}) => <div className="text-start">{row.original.username}</div>,
        },
        {
            id: 'actions',
            header: () => <div className="text-end font-bold pe-8">Aksi</div>,
            cell: ({row}) => {
                const user = row.original;

                return (
                    <div className="flex justify-end px-2">
                        <GeoButton
                            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                                e.stopPropagation();
                                setSelectedUser(user);
                                setEditOpen(true);
                            }}
                            variant="secondary"
                            className="h-[40px] w-[80px]"
                        >
                            <Pen/> Edit
                        </GeoButton>
                    </div>
                );
            }
        }
    ], [setSelectedUser, setEditOpen]);

    const studentColumns: ColumnDef<User>[] = useMemo(() => [
        {
            id: 'no',
            header: () => <div className="text-center font-bold">No</div>,
            cell: ({row}) => {
                const index = students?.users.findIndex(u => u._id === row.original._id) ?? -1;
                return <div className="text-center">{(students?.users.length ?? 0) - index}</div>;
            },
        },
        {
            accessorKey: 'username',
            header: () => <div className="text-start font-bold">Username</div>,
            cell: ({row}) => <div className="text-start">{row.original.username}</div>,
        },
        {
            id: 'actions',
            header: () => <div className="text-end font-bold pe-22">Aksi</div>,
            cell: ({row}) => {
                const user = row.original;

                return (
                    <div className="flex justify-end pe-4 space-x-4">
                        <GeoButton
                            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                                e.stopPropagation();
                                navigate({to: `/users/${user._id}`});
                            }}
                            variant="primary"
                            className="h-[40px] w-[80px]"
                        >
                            <Eye/> Lihat
                        </GeoButton>

                        <GeoButton
                            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                                e.stopPropagation();
                                setSelectedUser(user);
                                setEditOpen(true);
                            }}
                            variant="secondary"
                            className="h-[40px] w-[80px]"
                        >
                            <Pen/> Edit
                        </GeoButton>
                    </div>
                );
            }
        }
    ], [navigate, setSelectedUser, setEditOpen]);

    return (
        <div className="flex flex-col flex-grow px-4 md:px-16 space-y-4">
            <PageHeader title="Manajemen Akun" description="Kelola akun pada platform GeoViz."/>

            <div className="flex flex-col flex-grow xl:flex-row md:space-x-4 space-y-4 md:space-y-0">
                <GeoCard
                    icon={<GraduationCap/>}
                    title="Akun Siswa"
                    content={
                        <DataTable
                            columns={studentColumns}
                            data={students?.users ?? []}
                            onRowClick={(user) => navigate({to: `/users/${user._id}`})}
                        />
                    }
                    titleButton={
                        <AddUserForm
                            trigger={
                                <GeoButton className="w-[100px]">
                                    <Plus/> Tambah
                                </GeoButton>
                            }
                            role="student"
                            onSuccess={() => router.invalidate()}
                        />
                    }
                />

                {teachers &&
                    <GeoCard
                        icon={<Users/>}
                        title="Akun Guru"
                        content={
                            <DataTable
                                columns={teacherColumns}
                                data={teachers?.users ?? []}
                                onRowClick={(user) => {
                                    setSelectedUser(user);
                                    setEditOpen(true);
                                }}
                            />
                        }
                        titleButton={
                            <AddUserForm
                                trigger={
                                    <GeoButton className="w-[100px]">
                                        <Plus/> Tambah
                                    </GeoButton>
                                }
                                role="teacher"
                                onSuccess={() => router.invalidate()}
                            />
                        }
                    />
                }
            </div>

            {selectedUser && (
                <EditUserForm
                    open={editOpen}
                    onOpenChange={setEditOpen}
                    user={selectedUser}
                    onSuccess={() => {
                        setSelectedUser(null);
                        router.invalidate();
                    }}
                    onDeleteClick={() => {
                        setDeleteOpen(true);
                    }}
                />
            )}

            {selectedUser && (
                <DeleteUserForm
                    open={deleteOpen}
                    onOpenChange={() => {
                        setDeleteOpen(false);
                    }}
                    user={selectedUser}
                    onSuccess={() => {
                        setSelectedUser(null);
                        router.invalidate();
                    }}
                />
            )}
        </div>
    );
}