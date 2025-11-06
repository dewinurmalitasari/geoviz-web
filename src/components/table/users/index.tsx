import {useMemo} from 'react';
import type {ColumnDef} from '@tanstack/react-table';
import {Eye, Pen} from 'lucide-react';
import GeoButton from '@/components/geo/geo-button.tsx';
import {ROUTES, type User, type UsersResponse} from '@/type.ts';
import he from "he";

interface TeacherColumnsProps {
    teachers: UsersResponse | null;
    onEdit: (user: User) => void;
}

interface StudentColumnsProps {
    students: UsersResponse | null;
    onEdit: (user: User) => void;
}

export function useTeacherColumns({teachers, onEdit}: TeacherColumnsProps): ColumnDef<User>[] {
    return useMemo(() => [
        {
            id: 'no',
            header: () => <div className="text-center font-bold">No</div>,
            cell: ({row}) => {
                const index = teachers?.users.findIndex(u => u._id === row.original._id) ?? -1;
                return <div className="text-center">{(teachers?.users.length ?? 0) - index}</div>;
            },
        },
        {
            id: 'username',
            accessorKey: 'username',
            header: () => <div className="text-start font-bold">Username</div>,
            cell: ({row}) => <div className="text-start">{he.decode(row.original.username)}</div>,
        },
        {
            id: 'actions',
            header: () => <div className="text-end font-bold pe-8">Aksi</div>,
            cell: ({row}) => {
                const user = row.original;

                return (
                    <div className="flex justify-end px-2">
                        <GeoButton
                            onClick={() => onEdit(user)}
                            variant="secondary"
                            className="h-[40px] w-[80px]"
                        >
                            <Pen/> Edit
                        </GeoButton>
                    </div>
                );
            }
        }
    ], [teachers, onEdit]);
}

export function useStudentColumns({students, onEdit}: StudentColumnsProps): ColumnDef<User>[] {
    return useMemo(() => [
        {
            id: 'no',
            header: () => <div className="text-center font-bold">No</div>,
            cell: ({row}) => {
                const index = students?.users.findIndex(u => u._id === row.original._id) ?? -1;
                return <div className="text-center">{(students?.users.length ?? 0) - index}</div>;
            },
        },
        {
            id: 'username',
            accessorKey: 'username',
            header: () => <div className="text-start font-bold">Username</div>,
            cell: ({row}) => <div className="text-start">{he.decode(row.original.username)}</div>,
        },
        {
            id: 'actions',
            header: () => <div className="text-end font-bold pe-22">Aksi</div>,
            cell: ({row}) => {
                const user = row.original;

                return (
                    <div className="flex justify-end pe-4 space-x-4">
                        <GeoButton
                            to={ROUTES.users.userDetail(user._id)}
                            variant="primary"
                            className="h-[40px] w-[80px]"
                        >
                            <Eye/> Lihat
                        </GeoButton>

                        <GeoButton
                            onClick={() => onEdit(user)}
                            variant="secondary"
                            className="h-[40px] w-[80px]"
                        >
                            <Pen/> Edit
                        </GeoButton>
                    </div>
                );
            }
        }
    ], [students, onEdit]);
}