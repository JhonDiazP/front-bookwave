import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MenuItem, Message, MessageService } from 'primeng/api';
import { DropdownChangeEvent } from 'primeng/dropdown';
import { ContractTypesService } from 'src/app/business-controller/contract-types.service';
import { DocumentTypeService } from 'src/app/business-controller/document-type.service';
import { GenderService } from 'src/app/business-controller/gender.service';
import { PositionService } from 'src/app/business-controller/position.service';
import { ProjectService } from 'src/app/business-controller/project.service';
import { TerritoriesService } from 'src/app/business-controller/territories.service';
import { UserRoleService } from 'src/app/business-controller/user-role.service';
import { UserService } from 'src/app/business-controller/user.service';
import { ContractType } from 'src/app/models/contract-type';
import { DocumentType } from 'src/app/models/document-type';
import { Gender } from 'src/app/models/gender';
import { Position } from 'src/app/models/position';
import { Project } from 'src/app/models/project';
import { Role } from 'src/app/models/role';
import { Country } from 'src/app/models/territories/country';
import { Municipality } from 'src/app/models/territories/municipality';
import { Region } from 'src/app/models/territories/region';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-form-users',
  standalone: false,
  templateUrl: './form-users.component.html',
  styleUrl: './form-users.component.scss'
})
export class FormUsersComponent {
  public userForm: FormGroup;
  public genders!: Gender[];
  public documentTypes!: DocumentType[];
  public projects!: Project[];
  public positions!: Position[];
  public roles!: Role[];
  public contractTypes!: ContractType[];
  public countries!: Country[];
  public regions!: Region[];
  public municipalities!: Municipality[];
  public msgs: Message[] = [];
  public userId: string = this.route.snapshot.params['id'];
  public items: MenuItem[] = [
    {
      icon: 'pi pi-home',
      route: '../../list-user'
    },
    {
      label: 'Crear Usuario',
      route: '../../form-user/'
    }
  ];

  constructor(
    private fb: FormBuilder,
    private territoriesService: TerritoriesService,
    private documentTypeService: DocumentTypeService,
    private genderService: GenderService,
    private userService: UserService,
    private messageService: MessageService,
    private rolesService: UserRoleService,
    private route: ActivatedRoute
  ) {
    this.userForm = this.fb.group({
      identification_type_id: ['', Validators.required],
      identification: ['', [Validators.required]],
      first_name: ['', Validators.required],
      middle_last_name: [''],
      last_name: ['', Validators.required],
      middle_first_name: [''],
      country: ['', Validators.required],
      region: ['', Validators.required],
      municipality_id: ['', Validators.required],
      gender_id: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      email: ['', [Validators.required, Validators.email]],
      password: [''],
      passwordConfirmed: [''],
      roles: [[], [Validators.required]],
      status: [true]
    },
    {
      validators: this.passwordsMatchValidator
    });
  }

  ngOnInit(): void {
    if(this.userId){
      this.getUserById();
      this.items = [
        {
          icon: 'pi pi-home',
          route: '../../list-user'
        },
        {
          label: 'Editar Usuario',
          route: '../../form-user/'+this.userId
        }
      ]
    }else {
      this.userForm.controls['password'].setValidators([Validators.required, this.passwordValidator()]);
      this.userForm.controls['passwordConfirmed'].setValidators([Validators.required]);

      this.userForm.controls['password'].updateValueAndValidity();
      this.userForm.controls['passwordConfirmed'].updateValueAndValidity();
    }
    this.getRoles();
    this.getCountries();
    this.getDocumentTypes();
    this.getGenders();
  }

  getDocumentTypes() {
    this.documentTypeService.getDocumentTypes().then(documentTypes => {
      this.documentTypes = documentTypes;
    }).catch(x => {

    })
  }

  getGenders() {
    this.genderService.getGenders().then(genders => {
      this.genders = genders;
    }).catch(x => {

    })
  }

  getCountries(){
    this.territoriesService.getCountry().then(countries => {
      this.countries = countries;
    }).catch(x => {

    })
  }

  getRegionsByCountry(event: DropdownChangeEvent){
    console.log(event.value);
    this.territoriesService.getRegion({country_id: event.value}).then(regions => {
      this.regions = regions;
    }).catch(x => {

    }).finally(() => {
      // if(this.userId){
      //   this.userForm.controls['region'].setValue(this.regions[0].id);
      // }
    })
  }

  getMunicipalitiesByRegion(event: DropdownChangeEvent){
    this.territoriesService.getMunicipalities({region_id: event.value}).then(municipalities => {
      this.municipalities = municipalities;
    }).catch(x => {

    })
  }

  getRoles(){
    this.rolesService.getRoles().then(roles => {
      console.log(roles);
      this.roles = roles;
    }).catch(x => {

    })
  }

  submitForm() {
    if (this.userForm.valid) {
      const user: User = this.userForm.value;
      if(this.userId){
        user.id = this.userId;
        this.userService.Update(user).then(response => {
          this.messageService.add({ key: 'tst', severity: 'success', summary: "Usuario actualizado", detail: response.message });
        }).catch(error => {
          let errorMessage = 'Ocurrió un error inesperado';
          if (error.error?.errors) {
            errorMessage = Object.keys(error.error.errors).map(key => error.error.errors[key].join(' ')).join(' ');
          } else if (error.error?.message) {
            errorMessage = error.error.message;
          }
          this.messageService.add({ key: 'tst', severity: 'error', summary: "Error", detail: errorMessage });
        })
      } else {
        this.userService.Save(user).then(response => {
          this.messageService.add({ key: 'tst', severity: 'success', summary: "Usuario creado", detail: response.message });
          this.refreshData();
        }).catch(error => {
          let errorMessage = 'Ocurrió un error inesperado';
          if (error.error?.errors) {
            errorMessage = Object.keys(error.error.errors).map(key => error.error.errors[key].join(' ')).join(' ');
          } else if (error.error?.message) {
            errorMessage = error.error.message;
          }
          this.messageService.add({ key: 'tst', severity: 'error', summary: "Error", detail: errorMessage });
        })
      }
    } else {
      this.messageService.add({ key: 'tst', severity: 'warn', summary: "Atención", detail: "Complete los campos requeridos" });
    }
  }

  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value || '';

      // Reglas de validación
      const hasUpperCase = /[A-Z]+/.test(value);
      const hasLowerCase = /[a-z]+/.test(value);
      const hasNumber = /\d+/.test(value);
      const hasSpecialCharacter = /[@$!%*?&+]+/.test(value);
      const isValidLength = value.length >= 8;

      const errors: ValidationErrors = {};

      // Generar los errores individuales
      if (!hasUpperCase) {
        errors['uppercase'] = 'Debe contener al menos una letra mayúscula.';
      }

      if (!hasLowerCase) {
        errors['lowercase'] = 'Debe contener al menos una letra minúscula.';
      }

      if (!hasNumber) {
        errors['number'] = 'Debe contener al menos un número.';
      }

      if (!hasSpecialCharacter) {
        errors['specialCharacter'] = 'Debe contener al menos un carácter especial (@$!%*?&+).';
      }

      if (!isValidLength) {
        errors['minLength'] = 'Debe tener al menos 8 caracteres.';
      }

      return Object.keys(errors).length ? errors : null;
    };
  }

  passwordsMatchValidator(form: AbstractControl): ValidationErrors | null {
    const password = form.get('password')?.value;
    const passwordConfirmed = form.get('passwordConfirmed')?.value;

    return password === passwordConfirmed ? null : { passwordMismatch: 'Las contraseñas no coinciden' };
  }

  refreshData(){
    this.userForm.reset();
    this.userForm.controls['status'].setValue(true);
  }

  async getUserById(){
    this.userService.gerUserById(this.userId).then(user => {
      this.userForm.patchValue(user);
      const roles: number[] = [];
      user.roles?.forEach(role => {
        roles.push(role.id);
      });
      this.userForm.controls['roles'].setValue(roles);
      this.userForm.controls['country'].setValue(user.municipality?.departament?.country_id);
      this.getRegionsByCountry({ originalEvent: new Event('change'), value: user.municipality?.departament?.country_id });
      this.userForm.controls['region'].setValue(user.municipality?.departament_id);
      this.getMunicipalitiesByRegion({ originalEvent: new Event('change'), value: user.municipality?.departament_id });
      this.userForm.controls['municipality_id'].setValue(user.municipality_id);
    });
  }

}
