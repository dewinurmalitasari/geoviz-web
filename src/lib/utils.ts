import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

declare global {
    interface String {
        toCapitalized(): string;
        translateRole(): string;
        translateType(): string;
        translateVisualizationType(): string;
    }
}

String.prototype.toCapitalized = function () {
    return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
};

String.prototype.translateRole = function () {
    switch (this.toLowerCase()) {
        case 'student':
            return 'Siswa';
        case 'teacher':
            return 'Guru';
        default:
            return this.toCapitalized();
    }
}

String.prototype.translateType = function () {
    switch (this.toLowerCase()) {
        case 'visit':
            return 'Kunjungi Situs';
        case 'material':
            return 'Akses Materi';
        case 'practice_attempt':
            return 'Latihan Dimulai';
        case 'practice_completed':
            return 'Latihan Selesai';
        default:
            return this.toCapitalized();
    }
}

String.prototype.translateVisualizationType = function () {
    switch (this.toLowerCase()) {
        case 'shape2d':
            return 'Bangun 2D';
        case 'shape3d':
            return 'Bangun 3D';
        case 'equation':
            return 'Persamaan';
        default:
            return this.toCapitalized();
    }
}